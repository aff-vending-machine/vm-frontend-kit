############################
# STEP 1 prepare the source
############################
# Use a smaller base image for the builder stage
FROM node:18-alpine AS builder

# update and install the latest dependencies on docker base image
RUN apk update && apk upgrade

# Set the working directory
WORKDIR /app

# Copy only the necessary package.json files
COPY package.json /app/

# install all the project npm dependencies
RUN npm install --legacy-peer-deps

# copy the sveltkit project content with proper permission for the user svelteuser
COPY . /app

# build the svelte project to generate the artifacts in build directory
RUN npm run build:production

############################
# STEP 2 the running container
############################
# Use an official Nginx image for the production stage
FROM nginx:1.21-alpine As runner
LABEL maintainer="Tanawat Hongthai <ztrixack.th@gmail.com>"

# Set a non-root user for the nginx container
# USER nginx

# Copy the built Vite.js app from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
