<?php
/**
 * Created by PhpStorm.
 * User: bruce
 * Date: 2015-12-08
 * Time: 오전 2:12
 */

session_start();
session_destroy();

header("Location: ../html/admin_login.html");