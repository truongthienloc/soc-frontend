.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x14 , 1
		auipc    x29 , 7
		auipc    x31 , 3
		auipc    x30 , 0
		lui      x17 , 4
		lui      x6 , 3
		lui      x4 , 1
		lui      x24 , 4
		sw       x16 , 20 (x14) 
		sw       x13 , 24 (x29) 
		sw       x19 , 28 (x31) 
		sw       x25 , 32 (x30) 
		sw       x22 , 36 (x17) 
		sw       x15 , 40 (x6) 
		sw       x2 , 44 (x4) 
		sw       x21 , 48 (x24) 
		lw       x3 , 48 (x24) 
		lw       x28 , 44 (x4) 
		lw       x1 , 40 (x6) 
		lw       x26 , 36 (x17) 
		lw       x23 , 32 (x30) 
		lw       x20 , 28 (x31) 
		lw       x7 , 24 (x29) 
		lw       x27 , 20 (x14) 
		bne      x27 , x16 , Fail
		bne      x7 , x13 , Fail
		bne      x20 , x19 , Fail
		bne      x23 , x25 , Fail
		bne      x26 , x22 , Fail
		bne      x1 , x15 , Fail
		bne      x28 , x2 , Fail
		bne      x3 , x21 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
