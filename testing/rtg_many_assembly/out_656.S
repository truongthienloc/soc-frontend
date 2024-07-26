.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x1 , 2
		auipc    x10 , 7
		auipc    x5 , 6
		auipc    x2 , 9
		lui      x26 , 8
		lui      x17 , 8
		lui      x15 , 6
		lui      x24 , 7
		sw       x8 , 16 (x1) 
		sw       x12 , 20 (x10) 
		sw       x20 , 24 (x5) 
		sw       x16 , 28 (x2) 
		sw       x31 , 32 (x26) 
		sw       x21 , 36 (x17) 
		sw       x22 , 40 (x15) 
		sw       x18 , 44 (x24) 
		lw       x14 , 44 (x24) 
		lw       x27 , 40 (x15) 
		lw       x9 , 36 (x17) 
		lw       x13 , 32 (x26) 
		lw       x11 , 28 (x2) 
		lw       x25 , 24 (x5) 
		lw       x6 , 20 (x10) 
		lw       x23 , 16 (x1) 
		bne      x23 , x8 , Fail
		bne      x6 , x12 , Fail
		bne      x25 , x20 , Fail
		bne      x11 , x16 , Fail
		bne      x13 , x31 , Fail
		bne      x9 , x21 , Fail
		bne      x27 , x22 , Fail
		bne      x14 , x18 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
