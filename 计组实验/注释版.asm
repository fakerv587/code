.text
.globl main
main:
    la $a0,input_num_msg; # 打印字符串，提示用户输入待排序数组长度
    li $v0,4
    syscall

    li $v0,5   # 接收用户收入的数组长度
    syscall

    la $t6,array     # $t6 是数组首地址
    move $t7,$zero   # $t7 是循环变量i
    move $t8,$v0       # $t8 是数组长度
    move $t9,$zero   # $t9 是循环变量j

input:               # input代码块用于完成数组元素的输入
    la $a0,input_int_msg  # 打印字符串，提示用户输入数组的元素
    li $v0,4
    syscall

    li $v0,5
    syscall

    move $t0,$t7     # 此处类似于C/C++中指针访问数组元素的方法
    mul $t0,$t0,4    # 数组元素所占字节数*循环变量+数组的起始地址=数组[循环变量]
    addu $t1,$t0,$t6
    sw $v0,0($t1)

    addi $t7,$t7,1
    blt $t7,$t8,input
    move $t7,$zero  # 完成输入后将循环变量置为0，可作为下一个循环的循环变量，以节省寄存器

loop1:
    move $t9,$zero    # 每次执行外层循环都将内层循环的循环变量置为0
loop2:
    move $t0,$t9      # 获取a[i]
    mul $t0,$t0,4
    addu $t1,$t0,$t6
    lw $t2,0($t1)

    addi $t0,$t9,1    # 获取a[i+1]
    mul $t0,$t0,4
    addu $t4,$t0,$t6
    lw $t3,0($t4)

    bge $t2,$t3,skip  # 如果a[i] > a[i+1],跳转到skip代码块
    sw $t3,0($t1)   # 否则就执行下面这两句，交换两者的值
    sw $t2,0($t4)    

skip:
   addi $t9,$t9,1   # 内层循环变量自增，且判断是否还满足循环条件
   addi $t0,$t9,1   # 如果满足，则跳转到loop2
   sub $t1,$t8,$t7    # 如果不满足，则将外层循环的循环变量自增，且判断是否还满足循环条件
   blt $t0,$t1,loop2  # 如果满足，则跳转到loop1
   addi $t7,$t7,1     # 如果不满足，则不跳转，继续执行下面的代码
   sub $t2,$t8,1
   blt $t7,$t2,loop1

output:
   la $a0,output_int_msg  #  打印字符串，提示用户即将输出程序
   li $v0,4
   syscall

   move $t7,$zero   # 将循环变量置为0，用于下一循环，节省寄存器

print:          # 实现打印数组元素
   move $t0,$t7
   mul $t0,$t0,4
   addu $t1,$t0,$t6
   lw $a0,0($t1)
   li $v0,1
   syscall

   la $a0,seperate  # 分隔数组元素
   li $v0,4
   syscall

   addi $t7,$t7,1
   blt $t7,$t8,print   # 如果满足循环条件，跳转到print继续执行循环


.data
array:.space 1024
input_num_msg:.asciiz "Please enter the number of integers:\n"
input_int_msg:.asciiz "Please enter the integers to be sorted:\n"
output_int_msg:.asciiz "The sorted numbers are:\n"
seperate:.asciiz " "
