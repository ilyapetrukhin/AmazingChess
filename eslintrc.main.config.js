// @ts-nocheck
/** @type {import('eslint').Linter.Config} */

const imports = require('./eslintrc.imports.config');

module.exports = {
	config: {
		// Определение окружения в котором будет работать код
		env: {
			browser: true, // Окружение браузера
			es2021: true, // Поддержка ES2021
			node: true, // Окружение Node.js
		},
		// Список расширений конфигурации ESLint
		extends: [
			// 'airbnb-base',
			// 'airbnb-typescript',
			'plugin:@typescript-eslint/recommended',
			'plugin:react-hooks/recommended',
			// 'plugin:@next/next/recommended',
			// 'plugin:boundaries/recommended',
			'plugin:react/recommended',
			// 'plugin:prettier/recommended',
			'plugin:import/errors',
			'plugin:import/warnings',
			'plugin:import/typescript',
			// 'prettier',
		],
		parser: '@typescript-eslint/parser',
		parserOptions: {
			sourceType: 'module', // Использование модулей ES6
			useJSXTextNode: true,
			project: './tsconfig.eslint.json',
			tsconfigRootDir: [
				"src"
			  ],
			
			ecmaVersion: 'latest',
			ecmaFeatures: {
				jsx: true,
			},
		},
		plugins: [
			'react',
			'@typescript-eslint',
			'import',
			'simple-import-sort',
			'prettier',
		],
		root: true, // Указание ESLint что это корневая директория проекта
		settings: {
			react: {
				version: 'detect', // Автоматическое определение версии React
			},
			...imports.config.settings,
		},
		rules: {
			// base ESLint
			'prettier/prettier': 'error',
			quotes: ['warn', 'single'], // Предупреждение при использовании двойных кавычек
			'no-use-before-define': 'off', // Отключение правила использования переменной до ее определения
			'no-implicit-coercion': 'off', // Отключение правила неявного приведения типов

			'no-shadow': 'off', // Отключение правила запрещающего перекрытие переменных
			'no-restricted-exports': 'off', // Отключение правила запрещающего экспорт определенных имен
			'no-confusing-arrow': 'off', // Отключение правила запрещающего использование стрелочных функций, где его можно спутать с оператором сравнения a => 1 ? 2 : 3
			'node/no-unpublished-import': 'off', // Отключение правила запрещающего импорт из неопубликованных пакетов
			'node/no-unsupported-features/es-syntax': 'off', // Отключение правила запрещающего использование неподдерживаемых функций ES // TODO: Возможно стоит изменить
			'no-console': 'warn', // Запрет на использование console.log
			'comma-dangle': 'off', // Отключение правила запрещающего висячие запятые
			'linebreak-style': 'off', // Отключение правила стиля переноса строки
			'no-useless-catch': 'off', // Отключение правила запрещающего бесполезные блоки catch
			'no-plusplus': 'off', // Отключение правила запрещающего использование операторов ++ и --
			'no-param-reassign': 'error', // Включение правила запрещающего переназначение параметров
			'padding-line-between-statements': 'off', // Отключение правила требующего отступы между операторами
			'no-underscore-dangle': [
				// Запрет на использование подчеркивания в начале или конце имен
				'error',
				{
					allow: ['__typename'], // Разрешение на использование __typename  // TODO: Возможно стоит изменить
				},
			],
			'lines-between-class-members': [
				// Требование наличия пустых строк между членами класса  // TODO: Возможно стоит изменить
				'error',
				'always',
				{
					exceptAfterSingleLine: true, // Исключение для однострочных членов класса
				},
			],
			'no-void': [
				// Запрет на использование оператора void
				'error',
				{
					allowAsStatement: true,
				},
			],
			'arrow-body-style': 'off',

			// @typescript-eslint
			'@typescript-eslint/no-explicit-any': 'error', // Запрет на использование типа any
			'@typescript-eslint/no-non-null-assertion': 'error', // Запрет на использование оператора non-null assertion (!)
			'@typescript-eslint/no-redeclare': 'error', // Запрет на повторное объявление переменной
			'@typescript-eslint/no-non-null-asserted-optional-chain': 'error', // Запрет на использование оператора non-null assertion (!) вместе с optional chaining
			'@typescript-eslint/ban-ts-comment': 'error', // Запрет на использование комментариев ts-ignore, ts-expect-error, ts-nocheck, ts-check
			'@typescript-eslint/ban-types': 'error', // Запрет на использование определенных типов, таких как String, Number, и Boolean (вместо string, number, и boolean)
			'spaced-comment': 'error', // Требование наличия пробела после //
			eqeqeq: ['error', 'always'], // Требование использования === и !== вместо == и !=
			'@typescript-eslint/explicit-module-boundary-types': 0, // Отключение правила требующего явного указания типов на границах модулей
			'@typescript-eslint/no-shadow': 'error', // Запрет на перекрытие переменных
			'@typescript-eslint/default-param-last': 'off', // Отключение правила требующего, чтобы параметры по умолчанию шли последними
			'@typescript-eslint/no-var-requires': 'off', // Отключение правила запрещающего использование var-requires
			'@typescript-eslint/consistent-type-imports': [
				// Правило для использования согласованных импортов типов
				'warn',
				{
					fixStyle: 'inline-type-imports', // Если type не указан в экспорте, то вставит внутрь тела импорта
				},
			],
			'@typescript-eslint/no-use-before-define': [
				// Запрет на использование переменной до ее определения
				'error',
				{
					functions: false, // Не применяется к функциям
					variables: false, // Не применяется к переменным
				},
			],
			'@typescript-eslint/no-unused-vars': [
				// Запрет на неиспользуемые переменные
				'error',
				{
					vars: 'all', // Применяется ко всем переменным
					args: 'after-used', // Применяется к аргументам только после их использования
					ignoreRestSiblings: true, // Игнорирование оставшихся сиблингов в деструктуризации
					caughtErrors: 'none', // Не применяется к перехваченным ошибкам
					argsIgnorePattern:
						'^(_|doc$|req$|res$|next$|props$|params$|opts$|e$)', // Игнорирование аргументов, соответствующих этому шаблону
				},
			],
			// react
			'react/jsx-uses-react': 'error', // Требование, чтобы React был в области видимости при использовании JSX
			'react/jsx-uses-vars': 'error', // Проверка на использование всех переменных в JSX коде
			'react/jsx-props-no-spreading': 'off', // Разрешить распространение props
			'react/react-in-jsx-scope': 'off', // React не нужно импортировать с версии 17
			'react-hooks/exhaustive-deps': [
				'warn',
				{
					// Правила проверки deps для кастомных хуков из https://ahooks.js.org/
					additionalHooks: '(useUpdateEffect|useUpdateLayoutEffect)',
				},
			],
			'react/jsx-filename-extension': [
				'error',
				{
					extensions: ['.jsx', 'tsx'], // Разрешить указанные расширения файлов для JSX
				},
			],
			'react/function-component-definition': [
				'error',
				{
					namedComponents: [
						'function-declaration',
						'function-expression',
						'arrow-function',
					],
					unnamedComponents: 'function-expression', // Определение неименованных компонентов с помощью function-expression
				},
			],
			'react/prop-types': 'off', // Отключить проверку prop-types, так как мы используем TypeScript
			'react/require-default-props': 'off', // Не требовать defaultProps для каждого prop, не указанного как обязательное
			'react/button-has-type': 'off', // Не требовать указания типа для кнопок (по умолчанию "submit")
			// react-hooks
			'react-hooks/rules-of-hooks': 'error', // Только вызывайте хуки из функциональных компонентов и тела других хуков
			...imports.config.rules,
		},
	},
};

// TODO: Добавит эти правила
// "import/max-dependencies": ["error", {
//   "max": 10,
//   "ignoreTypeImports": false,
// }]
