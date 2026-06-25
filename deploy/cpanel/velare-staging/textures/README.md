# Textures Directory

This directory contains texture files for 3D models and materials.

## Supported Formats
- `.jpg` - Standard JPEG textures
- `.png` - PNG with transparency support
- `.webp` - Modern web format
- `.hdr` - HDR environment maps

## Structure
- `diffuse/` - Base color textures
- `normal/` - Normal maps for surface detail
- `roughness/` - Surface roughness maps
- `metallic/` - Metallic/reflection maps
- `emissive/` - Light emission textures
- `environments/` - Environment and skybox textures

## Guidelines
- Use power-of-2 dimensions (512x512, 1024x1024, etc.)
- Compress textures appropriately for web use
- Include multiple resolution versions
- Test on various devices and browsers
