import React, { useState, useEffect } from 'react'
import UploadImages from '../components/UploadImages';
import Waterfall from '../components/Waterfall';
import { collection, query, where, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import {auth, db, storage} from '../firebase'

const Portfolio = () => {
  
  return (
    <div>
      <UploadImages />
    </div>
  );
}

export default Portfolio