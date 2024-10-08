provider "aws" {
  region     = "us-east-1"  # Specify your desired AWS region
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
}



resource "aws_instance" "example" {
  ami                    = "ami-0e731c8a588258d0d" 
  instance_type          = "t2.micro"
  key_name               = "my-key-pair"
  vpc_security_group_ids = ["sg-0b359e8b40a52e9e2"]
  tags = {
    Name = "terraform project"
  }



  provisioner "remote-exec" {
     inline = [
        "sudo yum update -y",
        "sudo yum install httpd -y",
        "sudo systemctl start httpd",
        "sudo systemctl enable httpd",
        "mkdir project",
        "cd project",
        "sudo yum install git -y",
        "git clone https://github.com/JustinSamuel522/New_Terraform_Testing.git /home/ec2-user/project", # Clone the repositor
        "sudo chmod 644 ~/project/src/index.html", #Creating permissions for file in source code
        "sudo mv ~/project/src/index.html /var/www/html/", # moving files to destination directory for frontend
        "sudo chmod 644 ~/project/src/styles.css",
        "sudo mv ~/project/src/styles.css /var/www/html/",
        "sudo chmod 644 /home/ec2-user/project/src/images/*.jpg", # Set permissions for all JPEG images in the images folder
        "sudo mv /home/ec2-user/project/src/images/*.jpg /var/www/html/images/", # Move all JPEG images to web server images directory
        "sudo chmod 644 ~/project/src/app.js",
        "sudo mv ~/project/src/app.js /var/www/html/",
        "sudo chmod 644 ~/project/src/sign-up.html",
        "sudo mv ~/project/src/sign-up.html /var/www/html/",
        "sudo chmod 644 ~/project/src/customer.html",
        "sudo mv ~/project/src/customer.html /var/www/html/",
        "sudo chmod 644 ~/project/src/photo-gallery.html",
        "sudo mv ~/project/src/photo-gallery.html /var/www/html/",


      
    ]
    
    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = base64decode(var.private_key_base64)
      host        = self.public_ip
    }
  }
}

variable "private_key_base64" {
  description = "Base64 encoded private key content"
  type        = string
}

variable "aws_access_key_id" {
  description = "AWS access key ID"
  type        = string
}

variable "aws_secret_access_key" {
  description = "AWS secret access key"
  type        = string
}
