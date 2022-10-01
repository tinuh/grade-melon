import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react';
import { useEffect } from 'react'
import StudentVue from 'studentvue';
import { TextInput, Label, Checkbox, Button } from 'flowbite-react'

const login = async (username, password) => {
  const client = await StudentVue.login('https://md-mcps-psv.edupoint.com', { username: username, password: password });
  client.gradebook().then((res) => {
    console.log(res);
  })
  
  return client;
}

export default function Home() {
  const [client, setClient] = useState(undefined);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    await login(username, password).then((res) => {
      setClient(res);
    });
    await setUsername('');
    await setPassword('');
  }

  return (
    <div>
      <h1>Grade Melon</h1>
      <form className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="username"
            value="Username"
          />
        </div>
        <TextInput
          id="username1"
          type="username"
          placeholder="Student ID"
          value = {username}
          onChange = {(e) => {setUsername(e.target.value)}}
          required={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password1"
            value="Your password"
          />
        </div>
        <TextInput
          id="password1"
          type="password"
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          required={true}
        />
      </div>
      <Button onClick = {handleSubmit}>
        Submit
      </Button>
    </form>
    </div>
  )
}
