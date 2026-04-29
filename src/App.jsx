import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [questions, setQuestions] = useState([]) // 一般質問のデータを入れる場所
  const [loading, setLoading] = useState(true)

  // アプリが開いた瞬間にデータを読み込む
  useEffect(() => {
    fetchQuestions()
  }, [])

  async function fetchQuestions() {
    setLoading(true)
    // Supabaseの「questions」というテーブルからデータを取得
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('データ取得エラー:', error)
    } else {
      setQuestions(data)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>議員ポータル 正式版</h1>
      
      {/* メニュータイルの例 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={tileStyle}>
          <h3>一般質問検索</h3>
          <p>{loading ? '読み込み中...' : `${questions.length}件のデータがあります`}</p>
        </div>
        {/* 他のタイルも同様に配置 */}
      </div>

      {/* 取得したデータの表示例 */}
      <div style={{ marginTop: '30px' }}>
        <h2>新着の一般質問</h2>
        <ul>
          {questions.map((q) => (
            <li key={q.id}>{q.title}（{q.date}）</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const tileStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  textAlign: 'center'
}

export default App
