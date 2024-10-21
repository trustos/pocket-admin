# Define the current directory as GOPATH
GOPATH := $(shell pwd)

# Detect current OS
UNAME_S := $(shell uname -s)

ifeq ($(UNAME_S),Linux)
    OS := linux
else ifeq ($(UNAME_S),Darwin)
    OS := darwin
else ifeq ($(OS),Windows_NT)
    OS := windows
else
    OS := unknown
endif

# Detect current architecture
UNAME_M := $(shell uname -m)

ifeq ($(UNAME_M),x86_64)
    ARCH := amd64
else ifeq ($(UNAME_M),arm64)
    ARCH := arm64
else ifeq ($(UNAME_M),aarch64)
    ARCH := arm64
else ifeq ($(UNAME_M),i386)
    ARCH := 386
else ifeq ($(UNAME_M),i686)
    ARCH := 386
else
    ARCH := unknown
endif

build-linux-arm64:
	@echo "Building pocket-admin for Linux ARM64"
	GOOS=linux GOARCH=arm64 CGO_ENABLED=0 go build -o pocket-admin-linux-arm64 main.go

build:
	@echo "Detected OS: $(OS)"
	@if [ "$(OS)" = "unknown" ]; then \
		echo "Unsupported OS detected."; \
		exit 1; \
	fi

	@echo "Detected architecture: $(ARCH)"
	@if [ "$(ARCH)" = "unknown" ]; then \
		echo "Unsupported architecture detected."; \
		exit 1; \
	fi

	@if [ "$(ARCH)" != "unknown" ] && [ "$(OS)" != "unknown" ]; then \
	   echo "Building pocket-admin for $(OS) $(ARCH)"; \
	   GOOS=$(OS) GOARCH=$(ARCH) CGO_ENABLED=0 go build -o pocket-admin main.go; \
    fi

init:
	go mod init pocket-admin && go mod tidy

serve:
	go run main.go serve

run:
	./pocket-admin serve

clean:
	rm go.mod go.sum

.PHONY: build init serve run clean build-linux-arm64
