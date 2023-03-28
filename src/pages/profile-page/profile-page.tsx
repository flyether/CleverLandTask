import React, { useEffect, useState, } from 'react';

import user from '../../assets/img/avatar.png'
import { ServerGoodResponse } from '../../components/errors';
import { BookHistory, BookingBook, YourBook } from '../../components/profile-components';
import { Url } from '../../models/constants';
import { ImgUpdateUserReq } from '../../models/interfaces';
import { useAppSelector} from '../../store';
import { BookAPI } from '../../store/services/book-service';
import { UserAPI } from '../../store/services/user-servese';

import { FormProfile } from '.';

import styles from './profile-page.module.css';

export const ProfilePage = () => {

  const [isResponsive, setResponsive] = useState(false);
  const [isModalErrorActive, setModalErrorActive] = useState(false);
  const { userMe } = useAppSelector((state) => state.userData);
  const [userData, setUserData] = useState(userMe);
  const [updateUserImg, { data: userDataNew}] = UserAPI.useUpdateUserImgMutation();
  const [uploadImg] = UserAPI.useUploadImgMutation()
  const [url, setUrl] = useState(userMe.avatar && userMe.avatar !== null ? `${userMe.avatar}` : user);

   UserAPI.useGetUserMeQuery();
   BookAPI.useGetAllBooksQuery();

  useEffect(() => {
    if (userDataNew) {
      setUserData(userDataNew)

    }
  }, [userDataNew]);

  useEffect(() => {
    if (userMe) {
      setUserData(userMe)
    }
    if (userMe.avatar && userMe.avatar !== null) {
      setUrl(`${Url.BASE_URL}${userMe.avatar}`)
    }
  }, [userMe]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {

      const image = e.target.files[0];
      const formData = new FormData();

      formData.append('files', image);
      const res = await uploadImg(formData)

      if ('data' in res) {
        const { id } = res.data[0];

        if (userData?.id) {
          const send: ImgUpdateUserReq = {
            id: userData?.id.toString(),
            body: {
              avatar: id
            }
          }

          await updateUserImg(send).unwrap()
          setResponsive(true)
        }
      }
    }
  }

  return (
    <React.Fragment>
      {isResponsive && <ServerGoodResponse message='Фото успешно сохранено!' close={() => setResponsive(false)} />}
      <main className={styles.container}>
        <div className={styles.container__user} data-test-id='profile-avatar'>
          <div className={styles.user__pick}>
            <img src={url} className={styles.user__pick} alt='user pic' />
            <input
              className={styles.user__upload}
              type="file"
              accept="image/*"
              multiple={false}
              onChange={handleFileSelect}
              id="upload-file"
            />
            <label htmlFor="upload-file" className={styles.overlay} >
              <svg className={styles.svg} />
            </label>
          </div>
          <div className={styles.user__name}><div>{userData?.firstName} </div><div>{userData?.lastName} </div></div>
        </div>
        <FormProfile userData={userData} />
        <BookingBook userData={userData} />
        <YourBook userData={userData} />
        <BookHistory userData={userData} />
      </main>
    </React.Fragment>
  )
};

