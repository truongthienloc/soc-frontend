.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x14 , 2
		auipc    x21 , 1
		auipc    x31 , 1
		auipc    x22 , 2
		lui      x13 , 8
		lui      x1 , 7
		lui      x3 , 8
		lui      x5 , 1
		sw       x19 , 0 (x14) 
		sw       x23 , 4 (x21) 
		sw       x28 , 8 (x31) 
		sw       x6 , 12 (x22) 
		sw       x18 , 16 (x13) 
		sw       x8 , 20 (x1) 
		sw       x30 , 24 (x3) 
		sw       x7 , 28 (x5) 
		lw       x4 , 28 (x5) 
		lw       x11 , 24 (x3) 
		lw       x27 , 20 (x1) 
		lw       x10 , 16 (x13) 
		lw       x12 , 12 (x22) 
		lw       x26 , 8 (x31) 
		lw       x24 , 4 (x21) 
		lw       x17 , 0 (x14) 
		bne      x17 , x19 , Fail
		bne      x24 , x23 , Fail
		bne      x26 , x28 , Fail
		bne      x12 , x6 , Fail
		bne      x10 , x18 , Fail
		bne      x27 , x8 , Fail
		bne      x11 , x30 , Fail
		bne      x4 , x7 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
