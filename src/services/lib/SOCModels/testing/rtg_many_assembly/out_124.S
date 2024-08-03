.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x8 , 6
		auipc    x18 , 1
		auipc    x25 , 8
		auipc    x13 , 1
		lui      x9 , 9
		lui      x1 , 2
		lui      x2 , 9
		lui      x31 , 4
		sw       x14 , 24 (x8) 
		sw       x29 , 28 (x18) 
		sw       x20 , 32 (x25) 
		sw       x30 , 36 (x13) 
		sw       x10 , 40 (x9) 
		sw       x27 , 44 (x1) 
		sw       x23 , 48 (x2) 
		sw       x15 , 52 (x31) 
		lw       x19 , 52 (x31) 
		lw       x24 , 48 (x2) 
		lw       x7 , 44 (x1) 
		lw       x6 , 40 (x9) 
		lw       x4 , 36 (x13) 
		lw       x12 , 32 (x25) 
		lw       x21 , 28 (x18) 
		lw       x16 , 24 (x8) 
		bne      x16 , x14 , Fail
		bne      x21 , x29 , Fail
		bne      x12 , x20 , Fail
		bne      x4 , x30 , Fail
		bne      x6 , x10 , Fail
		bne      x7 , x27 , Fail
		bne      x24 , x23 , Fail
		bne      x19 , x15 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
