import React,{ useState , useEffect } from 'react'
import firebaseConfig from '../config'

// Component ตรวจสอบว่า User มีการ Auth เข้ามาหรือเปล่า
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebaseConfig.auth().onAuthStateChanged((user) => {
            //เมื่อ User ล๊อกอิน/ล๊อกเอ้าส์
            setCurrentUser(user);
            //ลบทิ้ง
            setLoading(false);
        })
    }, [])
    // ทำงาน 1 ครั้ง

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        //แชร์ข้อมูล หรือ ส่ง สถานะ ของ c user ไปให้ component อื่นๆ
        <AuthContext.Provider value={{currentUser}}>
            {/* เอาไปห่อถึง component ตัวอื่น */}
            {children}
        </AuthContext.Provider>
    )
}


