import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GalleryItem from './GalleryItem';
import API from '../API';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/gallery.css';

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const [apartments, setApartments] = useState();

  useEffect(() => {
    API.get('/apartments/')
      .then(res => res.data)
      .then(data => setApartments(data));
  }, [i18n.language]);

  if (!apartments) {
    return <div className='loader'><CircularProgress style={{ width: '70px', height: '70px' }} /></div>;
  } else {
    return (
      <>
        <h2 id='main-title-gallery'>{t('page.gallery-h2.label')}</h2>
        <h4 id='subtitle-gallery'>{t('page.gallery-catchphrase.label')}</h4>
        <div className='gallery-container'>
          {apartments.map(apartment => {
            return <GalleryItem key={apartment.id} apartmentDetails={apartment} />;
          })}
        </div>
      </>
    );
  }
};

export default Gallery;
