var string = "<fieldset>\n  <legend>Login Information</legend>\n  <input class='form-control half-width' name='username' title='Username' placeholder='Username (required)'>\n  <input class='form-control half-width' type='password' name='password' title='Password' placeholder='Password (required)'>\n  <input class='form-control' type='email' name='email' title='E-mail Address' placeholder='E-mail (required)'>\n</fieldset>\n<fieldset>\n  <legend>Profile Information:</legend>\n  <input class='form-control half-width' name='first_name' title='First Name' placeholder='First Name'>\n  <input class='form-control half-width' name='last_name' title='Last Name' placeholder='Last Name'>\n  <input class='form-control half-width' name='birthdate' type='date' title='Date of Birth'>\n  <input class='form-control half-width' name='fach' list='fachs' title='Fach' placeholder='Fach'>\n\n  <datalist id='fachs'>\n    <option value='Soprano - lyric coloratura' />\n    <option value='Soprano - dramatic coloratura' />\n    <option value='Soprano - lyric' />\n    <option value='Soprano - spinto' />\n    <option value='Soprano - dramatic' />\n    <option value='Mezzo-soprano - Rossini' />\n    <option value='Mezzo-soprano - lyric' />\n    <option value='Mezzo-soprano - dramatic' />\n    <option value='Contralto' />\n    <option value='Countertenor' />\n    <option value='Tenor leggiero' />\n    <option value='Tenor - lyric' />\n    <option value='Tenor - spinto' />\n    <option value='Heldentenor' />\n    <option value='Lyric baritone' />\n    <option value='Dramatic baritone' />\n    <option value='Lyric bass' />\n    <option value='Basso buffo' />\n    <option value='Basso profondo' />\n    <option value='Other' />\n  </datalist>\n\n  <input class='form-control half-width' name='country' title='Country' placeholder='Country'>\n  <input class='form-control half-width' name='city' title='City' placeholder='City'>\n</fieldset>\n<fieldset>\n  <button type='submit' class='btn btn-dark'>Create Account</button>\n  <button type='reset' class='btn btn-dark'>Clear Form</button>\n</fieldset>";

module.exports = string;
