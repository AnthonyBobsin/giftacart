# Setup

Ensure Ruby version 3.0.0 is installed.

Install dependencies and setup database (sqlite3).

```sh
bundle install
bundle exec rails db:migrate
RAILS_ENV=test bundle exec rails db:migrate
```

Create fixtures
```sh
bundle exec rake db:seed:replant
```

Run backend server
```sh
rails s -p 3001
```

Run tests to confirm setup.

```sh
bundle exec rspec
```
