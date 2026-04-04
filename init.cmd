del package.json
npx -y create-next-app@latest tenbit-production --ts --tailwind --eslint --app --import-alias "@/*" --use-npm --yes
xcopy /s /e /h /y tenbit-production\* .
rmdir /s /q tenbit-production
del init.cmd
