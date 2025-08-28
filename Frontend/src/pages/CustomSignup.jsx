// 'use client';

// import { useState } from 'react';
// import { supabase } from '../lib/supabaseClient';
// import { generateTeacherId } from '../utils/generateTeacherId';
// import { useNavigate } from 'react-router-dom';

// const CustomSignup = () => {
//   const navigate = useNavigate();
//   const [role, setRole] = useState('student');
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: '',
//     phone: '',
//     class: '',
//     rollNo: '',
//     teacherIds: '',
//     teacherId: '',
//     subjects: ''
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleGenerateTeacherId = async () => {
//     let unique = false;
//     let newId = '';
//     while (!unique) {
//       newId = generateTeacherId();
//       const { data } = await supabase
//         .from('teachers')
//         .select('id')
//         .eq('teacher_id', newId)
//         .single();
//       if (!data) unique = true;
//     }
//     setFormData({ ...formData, teacherId: newId });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     const { error: signUpError } = await supabase.auth.signUp({ email, password });
//     if (signUpError) return alert('Signup failed: ' + signUpError.message);

//     const { data: sessionData } = await supabase.auth.getSession();
//     const user_id = sessionData?.session?.user?.id;

//     if (!user_id) return alert('Signup succeeded, but please verify your email.');

//     let insertResult;

//     if (role === 'student') {
//       insertResult = await supabase.from('students').insert([
//         {
//           auth_id: user_id,
//           email: formData.email,
//           name: formData.name,
//           phone: formData.phone,
//           class: formData.class,
//           roll_no: formData.rollNo,
//           teacher_ids: formData.teacherIds
//             .split(',')
//             .map((id) => id.trim().toUpperCase()),
//         },
//       ]);
//     } else {
//       insertResult = await supabase.from('teachers').insert([
//         {
//           auth_id: user_id,
//           email: formData.email,
//           name: formData.name,
//           phone: formData.phone,
//           subjects: formData.subjects.split(',').map((s) => s.trim()),
//           teacher_id: formData.teacherId,
//         },
//       ]);
//     }

//     if (insertResult.error) {
//       alert('Insert failed: ' + insertResult.error.message);
//     } else {
//       alert('Signup successful!');
//       navigate('/');
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSignup}
//       className="space-y-4 max-w-md mx-auto p-6 mt-10 rounded-lg bg-indigo-950 text-white shadow-xl"
//     >
//       <h2 className="text-yellow-300 text-2xl font-bold mb-4">EduniteX Signup</h2>
//       <select
//         value={role}
//         onChange={(e) => setRole(e.target.value)}
//         className="border border-yellow-300 p-2 rounded w-full bg-indigo-800"
//       >
//         <option value="student">Student</option>
//         <option value="teacher">Teacher</option>
//       </select>

//       <input name="email" onChange={handleChange} placeholder="Email" className="border p-2 rounded w-full bg-indigo-800" />
//       <input name="password" type="password" onChange={handleChange} placeholder="Password" className="border p-2 rounded w-full bg-indigo-800" />
//       <input name="name" onChange={handleChange} placeholder="Full Name" className="border p-2 rounded w-full bg-indigo-800" />
//       <input name="phone" onChange={handleChange} placeholder="Phone No" className="border p-2 rounded w-full bg-indigo-800" />

//       {role === 'student' && (
//         <>
//           <input name="class" onChange={handleChange} placeholder="Class" className="border p-2 rounded w-full bg-indigo-800" />
//           <input name="rollNo" onChange={handleChange} placeholder="Roll No" className="border p-2 rounded w-full bg-indigo-800" />
//           <input name="teacherIds" onChange={handleChange} placeholder="Teacher IDs (comma-separated)" className="border p-2 rounded w-full bg-indigo-800" />
//         </>
//       )}

//       {role === 'teacher' && (
//         <>
//           <input name="subjects" onChange={handleChange} placeholder="Subjects (comma-separated)" className="border p-2 rounded w-full bg-indigo-800" />
//           <div className="flex items-center gap-4">
//             <input name="teacherId" value={formData.teacherId} readOnly className="border p-2 rounded flex-grow bg-indigo-800" placeholder="Generated ID" />
//             <button type="button" onClick={handleGenerateTeacherId} className="px-3 py-2 bg-yellow-400 text-purple-900 rounded">
//               Generate ID
//             </button>
//           </div>
//         </>
//       )}

//       <button type="submit" className="bg-yellow-300 text-purple-900 font-bold px-4 py-2 rounded w-full hover:bg-yellow-400 transition">
//         Sign Up
//       </button>
//     </form>
//   );
// };

// export default CustomSignup;



'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { generateTeacherId } from '../utils/generateTeacherId';
import { useNavigate } from 'react-router-dom';

const CustomSignup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    class: '',
    rollNo: '',
    teacherIds: '',
    teacherId: '',
    subjects: ''
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGenerateTeacherId = async () => {
    let unique = false;
    let newId = '';
    while (!unique) {
      newId = generateTeacherId();
      const { data } = await supabase
        .from('teachers')
        .select('id')
        .eq('teacher_id', newId)
        .single();
      if (!data) unique = true;
    }
    setFormData({ ...formData, teacherId: newId });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const { error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) return alert('Signup failed: ' + signUpError.message);

    const { data: sessionData } = await supabase.auth.getSession();
    const user_id = sessionData?.session?.user?.id;

    if (!user_id) return alert('Signup succeeded, but please verify your email.');

    let insertResult;

    if (role === 'student') {
      insertResult = await supabase.from('students').insert([
        {
          auth_id: user_id,
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          class: formData.class,
          roll_no: formData.rollNo,
          teacher_ids: formData.teacherIds
            .split(',')
            .map((id) => id.trim().toUpperCase()),
        },
      ]);
    } else {
      insertResult = await supabase.from('teachers').insert([
        {
          auth_id: user_id,
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          subjects: formData.subjects.split(',').map((s) => s.trim()),
          teacher_id: formData.teacherId,
        },
      ]);
    }

    if (insertResult.error) {
      alert('Insert failed: ' + insertResult.error.message);
    } else {
      alert('Signup successful!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800  to-slate-900">
      <form
        onSubmit={handleSignup}
        className="space-y-4 max-w-md w-full p-6 mt-10 rounded-xl bg-blue-700/80 shadow-lg border border-gray-200"
      >
        <h2 className="text-white text-2xl font-bold mb-4 text-center">
          EduniteX Signup
        </h2>

        {/* Role Selector */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-purple-500 outline-none"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {/* Common Fields */}
        <input name="email" onChange={handleChange} placeholder="Email" className="border p-2 rounded-md w-full focus:ring-2 focus:ring-purple-500 outline-none" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="border p-2 rounded-md w-full focus:ring-2 focus:ring-purple-500 outline-none" />
        <input name="name" onChange={handleChange} placeholder="Full Name" className="border p-2 rounded-md w-full focus:ring-2 focus:ring-purple-500 outline-none" />
        <input name="phone" onChange={handleChange} placeholder="Phone No" className="border p-2 rounded-md w-full focus:ring-2 focus:ring-purple-500 outline-none" />

        {/* Student Fields */}
        {role === 'student' && (
          <>
            <input name="class" onChange={handleChange} placeholder="Class" className="border p-2 rounded-md w-full focus:ring-2 focus:ring-purple-500 outline-none" />
            <input name="rollNo" onChange={handleChange} placeholder="Roll No" className="border p-2 rounded-md w-full focus:ring-2 focus:ring-purple-500 outline-none" />
            <input name="teacherIds" onChange={handleChange} placeholder="Teacher IDs (comma-separated)" className="border p-2 rounded-md w-full focus:ring-2 focus:ring-purple-500 outline-none" />
          </>
        )}

        {/* Teacher Fields */}
        {role === 'teacher' && (
          <>
            <input name="subjects" onChange={handleChange} placeholder="Subjects (comma-separated)" className="border p-2 rounded-md w-full focus:ring-2 focus:ring-purple-500 outline-none" />
            <div className="flex items-center gap-4">
              <input name="teacherId" value={formData.teacherId} readOnly className="border p-2 rounded-md flex-grow focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Generated ID" />
              <button type="button" onClick={handleGenerateTeacherId} className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
                Generate ID
              </button>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500/80 text-white font-bold px-4 py-2 rounded-md w-full hover:bg-purple-700 transition">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default CustomSignup;
