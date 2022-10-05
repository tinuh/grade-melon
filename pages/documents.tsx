import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Spinner } from "flowbite-react";

const base64toBlob = (base64Data: string) => {
	const sliceSize = 1024;
	const byteCharacters = atob(base64Data);
	const bytesLength = byteCharacters.length;
	const slicesCount = Math.ceil(bytesLength / sliceSize);
	const byteArrays = new Array(slicesCount);

	for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
		const begin = sliceIndex * sliceSize;
		const end = Math.min(begin + sliceSize, bytesLength);

		const bytes = new Array(end - begin);
		for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
			bytes[i] = byteCharacters[offset].charCodeAt(0);
		}
		byteArrays[sliceIndex] = new Uint8Array(bytes);
	}
	return new Blob(byteArrays, { type: "application/pdf" });
};

const openBase64NewTab = (base64Pdf: string): void => {
	let blob = base64toBlob(base64Pdf);
	if (typeof window !== "undefined") {
		if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
			(window.navigator as any).msSaveOrOpenBlob(blob, "pdfBase64.pdf");
		} else {
			const blobUrl = URL.createObjectURL(blob);
			window.open(blobUrl);
		}
	}
};

interface DocumentsProps {
	client: any;
}

export default function Documents({ client }: DocumentsProps) {
	const router = useRouter();
	const [documents, setDocuments] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			client.documents().then((res) => {
				console.log(res);
				setDocuments(res);
				setLoading(false);
			});
		} catch {
			if (localStorage.getItem("remember") === "false") {
				router.push("/login");
			}
		}
	}, [client]);

	return (
		<div className="p-5 md:p-10 h-full">
			<Head>
				<title>Documents - Grade Melon</title>
			</Head>
			{loading ? (
				<div className="flex justify-center">
					<Spinner size="xl" color="pink" />
				</div>
			) : (
				<div className="overflow-x-auto shadow-md rounded-lg">
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="py-3 pl-6">
									Date
								</th>
								<th scope="col" className="py-3 px-6">
									Document
								</th>
								<th scope="col" className="py-3 px-6">
									Category
								</th>
							</tr>
						</thead>
						<tbody>
							{documents &&
								documents.map((document, i) => (
									<tr
										className={`bg-${
											i % 2 == 0 ? "white" : "gray-50"
										} border-b dark:bg-gray-${
											i % 2 == 0 ? 900 : 800
										} dark:border-gray-700`}
										key={i}
									>
										<th
											scope="row"
											className="py-4 pl-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											{document.file.date.toLocaleDateString()}
										</th>
										<td className="py-4 px-6">
											<a
												onClick={async () => {
													let download = await document.get();
													console.log(download);
													openBase64NewTab(download[0].base64);
												}}
												href="#"
											>
												{document.comment}
											</a>
										</td>
										<td className="py-4 px-6">{document.file.type}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
