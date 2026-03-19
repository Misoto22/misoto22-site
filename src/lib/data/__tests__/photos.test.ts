jest.mock('../../supabase', () => ({ supabase: {} }))

import { mapPhoto, type DbPhoto } from '../photos'

const basePhoto: DbPhoto = {
  id: 42,
  src: '/photo.jpg',
  width: 1920,
  height: 1080,
  alt: 'Sunset over mountains',
  camera: 'Sony A7III',
  lens: '24-70mm f/2.8',
  focal_length: '50mm',
  aperture: 'f/2.8',
  shutter_speed: '1/250',
  iso: '100',
  alt_zh: '山上的日落',
}

describe('mapPhoto', () => {
  it('maps to frontend format with camelCase fields', () => {
    const result = mapPhoto(basePhoto, 'en')
    expect(result.id).toBe('42')
    expect(result.alt).toBe('Sunset over mountains')
    expect(result.focalLength).toBe('50mm')
    expect(result.shutterSpeed).toBe('1/250')
  })

  it('uses Chinese alt text when locale is zh', () => {
    const result = mapPhoto(basePhoto, 'zh')
    expect(result.alt).toBe('山上的日落')
  })

  it('converts numeric id to string', () => {
    const result = mapPhoto({ ...basePhoto, id: 0 })
    expect(result.id).toBe('')
  })

  it('handles missing optional EXIF fields', () => {
    const minimal: DbPhoto = {
      id: 1, src: '/photo.jpg', width: 800, height: 600, alt: 'Test',
    }
    const result = mapPhoto(minimal)
    expect(result.camera).toBeUndefined()
    expect(result.lens).toBeUndefined()
    expect(result.focalLength).toBeUndefined()
  })
})
