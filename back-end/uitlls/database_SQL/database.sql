-- Admin Table
CREATE TABLE admin (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) NULL,  -- Changed to VARCHAR for better handling
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_path VARCHAR(255) NULL,
    userId VARCHAR(255) NOT NULL,
    method VARCHAR(50) DEFAULT 'form',
    UNIQUE (userId),
    UNIQUE (phone_number)
);

-- RefreshToken Table
CREATE TABLE refreshToken (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId VARCHAR(255) NOT NULL,
    token TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

-- Staff Table
CREATE TABLE staff (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    idPointer VARCHAR(100) UNIQUE NOT NULL, -- Make idPointer UNIQUE
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE,
    image_path VARCHAR(255),
    role VARCHAR(50) DEFAULT 'unknown' ,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Resource Table
CREATE TABLE resource (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    idPointer VARCHAR(100) UNIQUE NOT NULL, -- Make idPointer UNIQUE
    name VARCHAR(100) NOT NULL,
    model VARCHAR(100) DEFAULT 'unknown',
    amount INT NOT NULL,
    usage_amount INT DEFAULT 0,
    action ENUM('necessary', 'unnecessary') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Service Table
CREATE TABLE service (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    idPointer VARCHAR(100) UNIQUE NOT NULL, -- Make idPointer UNIQUE
    name VARCHAR(100) NOT NULL,
    time_taken TIME NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Service_Resources Table
CREATE TABLE service_resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    service_id VARCHAR(100) NOT NULL, -- Matches VARCHAR(100) in service.idPointer
    resource_id VARCHAR(100) NOT NULL, -- Matches VARCHAR(100) in resource.idPointer
    quantity INT NOT NULL,
    FOREIGN KEY (service_id) REFERENCES service(idPointer) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resource(idPointer) ON DELETE CASCADE
) ENGINE=InnoDB;


-- Styles Table
CREATE TABLE styles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    style_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    service_array TEXT NOT NULL,  -- Changed JSON to TEXT for compatibility with older versions
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ServiceStyles Table
CREATE TABLE service_styles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    service_id BIGINT NOT NULL,
    style_id BIGINT NOT NULL,
    FOREIGN KEY (service_id) REFERENCES service(id) ON DELETE CASCADE,
    FOREIGN KEY (style_id) REFERENCES styles(id) ON DELETE CASCADE
);

-- Appointments Table
CREATE TABLE appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    staff_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    style_id BIGINT NOT NULL,
    appointment_date TIMESTAMP NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES service(id) ON DELETE CASCADE,
    FOREIGN KEY (style_id) REFERENCES styles(id) ON DELETE CASCADE,
    UNIQUE (user_id, appointment_date)
);

-- AppointmentResources Table
CREATE TABLE appointment_resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    appointment_id BIGINT NOT NULL,
    resource_id BIGINT NOT NULL,
    quantity_used INT NOT NULL,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resource(id) ON DELETE CASCADE,
    UNIQUE (appointment_id, resource_id)
);

-- Indexing Guidelines
CREATE INDEX idx_staff_email ON staff(email);
CREATE INDEX idx_resource_name ON resource(name);
CREATE INDEX idx_service_name ON service(name);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_styles_name ON styles(style_name);
