# pet store

## prerequisite
1. sudo apt-get install ruby

2. sudo apt-get install ruby-dev

3. sudo gem install compass

## Install dependencies
1. Run `npm install -g grunt grunt-cli bower`

3. Run `npm install`

4. Run `bower install`

## Build & development

Run `grunt serve` for preview.

## How to change environment variables ( or change api endpoint )
There is a configuration folder under project. ( path - ../app/config/ )

Inside this config folder, it contains 3 JSON files.
dev.json   - development environment
stage.json - stage environment
prod.json  - production environment

When execute grunt build:prod, it will auto load prod.json into the project.

When execute grunt serve, it will load dev.json by default.

## Testing

Running `npm test` will run the unit tests with karma.