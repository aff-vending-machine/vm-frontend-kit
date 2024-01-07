# Use an official Nginx image for the development stage
FROM nginx:1.21-alpine
LABEL maintainer="Tanawat Hongthai <ztrixack.th@gmail.com>"

# Set a non-root user for the nginx container
# USER nginx

# Copy the built Vite.js app from the builder stage
COPY build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
