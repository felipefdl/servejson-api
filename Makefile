# Executables
MOCHA_EXEC  = ./node_modules/.bin/mocha
JSLINT_EXEC = ./node_modules/jslint/bin/jslint.js

# Configurations
MOCHA_REPORTER = spec

test: jslint test-u test-i

jslint:
	@echo "\n---| JSLint |---"
	@find . \
	-name "*.js*" -print0 | xargs -0 $(JSLINT_EXEC)

test-u:
	@echo "\n---| Mocha (Unit) |---"
	@NODE_ENV="TEST" $(MOCHA_EXEC) \
	--reporter $(MOCHA_REPORTER) \
	--ui tdd \
	--recursive \
	test/unit/

test-i:
	@echo "\n---| Mocha (Integration) |---"
	@NODE_ENV="TEST" $(MOCHA_EXEC) \
	--reporter $(MOCHA_REPORTER) \
	--ui tdd \
	--recursive \
	test/integration/

.PHONY: test jslint test-u test-i
