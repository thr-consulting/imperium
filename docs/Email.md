---
id: email
title: Imperium Email
sidebar_label: Main
---

## How to test SMTP

### 1. Connection

#### Connect normally:
`$ telnet host:port`

#### Connect via STARTTLS:
`$ openssl s_client -debug -starttls smtp -crlf -connect host:port`

### 2. Greeting
`EHLO somedomain.name.com`

### 3. Login

#### Using AUTH LOGIN

Convert username and password to base64.

```bash
$ echo -ne "username" | base64
dXNlcm5hbWUK
$ echo -ne "password" | base64
cGFzc3dvcmQK
```

```
AUTH LOGIN
Username:
dXNlcm5hbWUK
Password:
cGFzc3dvcmQK
```

#### Using AUTH PLAIN
Convert username and password to base64 one-liner.
```bash
$ echo -ne "\0username\0password" | base64
AHVzZXJuYW1lAHBhc3N3b3Jk
```

```
AUTH PLAIN AHVzZXJuYW1lAHBhc3N3b3Jk
```

### 4. Sending

```
MAIL FROM:<sender@domain.com>
RCPT TO:recipient@somedomain.com
DATA
some text
.
```
