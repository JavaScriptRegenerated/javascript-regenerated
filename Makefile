dev_a:
	vercel dev

dev_b:
	npm run dev

staging:
	vercel

production:
	vercel --prod

update_deps:
	npm add react@latest react-dom@latest
	npm add -D @types/react@latest @types/react-dom@latest
	npm add remix@latest @remix-run/react@latest @remix-run/vercel@latest
	npm add -D @remix-run/dev@latest
