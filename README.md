# Quick Guide to Tagging and Versioning for a New Release on GitHub

## 1. Decide on a Version Number

Use [Semantic Versioning (SemVer)](https://semver.org/) with the format `MAJOR.MINOR.PATCH`:

- **MAJOR**: Incompatible API changes
- **MINOR**: Backward-compatible functionality
- **PATCH**: Backward-compatible bug fixes

**Example:** `v1.2.3`

## 1. Create a Git Tag

### 1. Annotated Tag (Recommended)

1. **Create an Annotated Tag:**

    ```bash
    git tag -a v1.2.3 -m "Release version 1.2.3"
    ```

### 2. Lightweight Tag (Not Recommended for Releases)

```bash
git tag v1.2.3
```

## 3. Push the Tag to Remote Repository

### Push a Specific Tag

```bash
git push origin v1.2.3
```
