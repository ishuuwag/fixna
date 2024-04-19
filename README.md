# fixna
This repository contains service implementation that allows citizens to report incidents and defects in public places in Windoek.

## Setup

To get your setup up and running run the follwing two commands

```bash
bal persist init --module store --datastore mysql
bal persist generate
```

This will initialize a git repo, download the dependencies in the latest versions and install all needed tools.
If needed code generation will be triggered in this target as well.

## Build & run

Start the database locally

```bash
docker compose up --build -d
```

Run the app

```bash
bal run
```