# Executables
MOCHA_EXEC  = ./node_modules/.bin/mocha
MOCHA__EXEC = ./node_modules/mocha/bin/_mocha
JSLINT_EXEC = ./node_modules/jslint/bin/jslint.js
ISTANBUL_EXEC = ./node_modules/istanbul/lib/cli.js
COVERALLS_EXEC = ./node_modules/coveralls/bin/coveralls.js

test: jslint test-u test-i

jslint:
	@echo "\n---| JSLint |---"
	@find . \
	-name "*.js*" -not -path "./coverage/*" -print0 | xargs -0 $(JSLINT_EXEC)

test-u:
	@echo "\n---| Mocha (Unit) |---"
	@NODE_ENV="TEST" $(MOCHA_EXEC) \
	--reporter spec \
	--ui tdd \
	--recursive \
	test/unit/

test-i:
	@echo "\n---| Mocha (Integration) |---"
	@NODE_ENV="TEST" $(MOCHA_EXEC) \
	--reporter spec \
	--ui tdd \
	--recursive \
	test/integration/

coverage:
	@echo "\n---| Test Coverage |---"
	@NODE_ENV="TEST" $(ISTANBUL_EXEC) \
	cover $(MOCHA__EXEC) --report html -- \
	--reporter dot \
	--ui tdd \
	--recursive test

coveralls:
	@echo "\n---| Test Coverage to Coveralls |---"
	@NODE_ENV="TEST" $(ISTANBUL_EXEC) \
	cover $(MOCHA__EXEC) --report lcovonly -- \
	--reporter dot \
	--ui tdd \
	--recursive test \
	&& cat ./coverage/lcov.info | $(COVERALLS_EXEC)

.PHONY: test jslint test-u test-i coverage coveralls
