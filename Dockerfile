###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY . /usr/src/app

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci  && npm cache clean --force

# Run the build command which creates the production bundle
RUN npm run build

###################
# PRODUCTION
###################

FROM nginx:1.23.1-alpine as production

ENV NODE_ENV production

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
