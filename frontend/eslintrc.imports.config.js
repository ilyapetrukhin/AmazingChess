const fs = require('fs');
const path = require('path');

// ! Список названий папок и файлов внутри в src, необходим для правильной сортировки imports
// Так библиотека импортов не различает node_modules пакеты от абсолютных импортов проекта
const folders = fs
	.readdirSync('src', { withFileTypes: true })
	.filter((dirent) => !dirent.name.startsWith('index'))
	.map((dirent) => path.parse(dirent.name).name);

const BANNED_PATH_MESSAGE =
	'Это приватный импорт ' +
	'Он запрещен  правилом eslint no-restricted-imports ' +
	'Вы можете добавить импорты в index.ts ';

const PREFER_ABSOLUTE_IMPORT_MESSAGE = 'Используйте абсолютный импорт ';

const FSD_BANNED_PATH_MESSAGE =
	'Импорт отсюда запрещен в архитектуре FSD. Прочитайте ./feature-sliced-design.md ';
module.exports = {
	config: {
		settings: {
			'import/parsers': {
				'@typescript-eslint/parser': ['.ts', '.tsx'],
			},
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
				},
				node: {
					paths: ['./'],
				},
			},
			'boundaries/elements': [
				{ type: 'app', pattern: 'src/app/*' },
				{ type: 'application', pattern: 'src/application/*' },
				{ type: 'views', pattern: 'src/views/*' },
				{ type: 'widgets', pattern: 'src/widgets/*' },
				{ type: 'features', pattern: 'src/features/*' },
				{ type: 'entities', pattern: 'src/entities/*' },
				{ type: 'shared', pattern: 'src/shared/*' },
			],
			'boundaries/ignore': ['**/*.test.*'],
		},
		rules: {
			'node/no-missing-import': 'off',
			'import/prefer-default-export': 'off',
			'import/no-default-export': 'error',
			'sort-imports': 'off',
			'import/order': 'off',
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': 'error',
			'import/no-cycle': 'error',
			'import/extensions': [
				'error',
				'ignorePackages',
				{
					js: 'never',
					jsx: 'never',
					ts: 'never',
					tsx: 'never',
				},
			],
			'simple-import-sort/exports': 'warn',
			'simple-import-sort/imports': [
				'error',
				{
					// ! Порядок внутренних массивов важен, он влияет на расстановку групп
					groups: [
						// Остальные импорты: Side effect imports.
						['^\\u0000'],
						// Пакеты, связанные с React + пакеты с node_modules
						['^react', '^next', '^[a-z]', '^@?\\w'],
						// FSD
						['^@/views/.*$'],
						['^@/widgets/.*$'],
						['^@/features/.*$'],
						['^@/entities/.*$'],
						['^@/shared/.*$'],
						// GraphQl
						['__generated__'],
						// Абсолютный импорт от src
						[`^(${folders.join('|')})`],
						// Родительский импорт. Начинающийся с "../"
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						// Относительный импорт. Начинающийся с './'
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
						// Импорты стилей
						['^\\./Style(/.*|$)', '^.+\\.?(s?css)$'],
					],
				},
			],
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							message: BANNED_PATH_MESSAGE,
							group: ['@/application/**'],
						},
						{
							message: BANNED_PATH_MESSAGE,
							group: ['@/views/*/**'],
						},
						{
							message: BANNED_PATH_MESSAGE,
							group: ['@/widgets/*/**'],
						},
						{
							message: BANNED_PATH_MESSAGE,
							group: ['@/features/*/**'],
						},
						{
							message: BANNED_PATH_MESSAGE,
							group: ['@/entities/*/**'],
						},
						{
							message: BANNED_PATH_MESSAGE,
							group: ['@/shared/*/*/**'],
						},
						{
							message: PREFER_ABSOLUTE_IMPORT_MESSAGE,
							group: ['../**/application'],
						},
						{
							message: PREFER_ABSOLUTE_IMPORT_MESSAGE,
							group: ['../**/views'],
						},
						{
							message: PREFER_ABSOLUTE_IMPORT_MESSAGE,
							group: ['../**/widgets'],
						},
						{
							message: PREFER_ABSOLUTE_IMPORT_MESSAGE,
							group: ['../**/features'],
						},
						{
							message: PREFER_ABSOLUTE_IMPORT_MESSAGE,
							group: ['../**/entities'],
						},
						{
							message: PREFER_ABSOLUTE_IMPORT_MESSAGE,
							group: ['../**/shared'],
						},
					],
				},
			],
			'boundaries/element-types': [
				'error',
				{
					default: 'disallow',
					rules: [
						{
							from: 'application',
							message: FSD_BANNED_PATH_MESSAGE,
							allow: ['views', 'widgets', 'features', 'entities', 'shared'],
							disallow: ['application'],
						},
						{
							from: 'views',
							message: FSD_BANNED_PATH_MESSAGE,
							allow: ['widgets', 'features', 'entities', 'shared'],
							disallow: ['application', 'views'],
						},
						{
							from: 'widgets',
							message: FSD_BANNED_PATH_MESSAGE,
							allow: ['features', 'entities', 'shared'],
							disallow: ['application', 'views', 'widgets'],
						},
						{
							from: 'features',
							message: FSD_BANNED_PATH_MESSAGE,
							allow: ['entities', 'shared'],
							disallow: ['application', 'views', 'widgets', 'features'],
						},
						{
							from: 'entities',
							message: FSD_BANNED_PATH_MESSAGE,
							allow: ['shared'],
							disallow: [
								'application',
								'views',
								'widgets',
								'features',
								'entities',
							],
						},
						{
							from: 'shared',
							message: FSD_BANNED_PATH_MESSAGE,
							allow: ['shared'],
							disallow: [
								'application',
								'views',
								'widgets',
								'features',
								'entities',
							],
						},
						{
							from: 'pages',
							message: FSD_BANNED_PATH_MESSAGE,
							allow: [
								'application',
								'views',
								'widgets',
								'features',
								'entities',
								'shared',
							],
							disallow: [],
						},
					],
				},
			],
		},
		overrides: [
			{ files: ['**/*.test.*'], rules: { 'boundaries/element-types': 'off' } },
		],
	},
};
