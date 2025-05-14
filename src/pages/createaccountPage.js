export default function CreateAccountPage() {
    return (
        <div id="create-account">
            <h1>Hesap Oluştur</h1>
            <form method="post" encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="username">Kullanıcı Adı</label>
                    <input type="text" name="username" id="username" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-posta</label>
                    <input type="email" name="email" id="email" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Şifre</label>
                    <input type="password" name="password" id="password" required />
                </div>

                <button type="submit">Hesap Oluştur</button>
            </form>
        </div>
    );
}