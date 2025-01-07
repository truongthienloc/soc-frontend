.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x27 , 2
		auipc    x8 , 4
		auipc    x4 , 3
		auipc    x18 , 6
		lui      x26 , 6
		lui      x28 , 1
		lui      x29 , 9
		lui      x15 , 0
		sw       x2 , 12 (x27) 
		sw       x10 , 16 (x8) 
		sw       x17 , 20 (x4) 
		sw       x22 , 24 (x18) 
		sw       x5 , 28 (x26) 
		sw       x14 , 32 (x28) 
		sw       x1 , 36 (x29) 
		sw       x30 , 40 (x15) 
		lw       x21 , 40 (x15) 
		lw       x6 , 36 (x29) 
		lw       x3 , 32 (x28) 
		lw       x13 , 28 (x26) 
		lw       x19 , 24 (x18) 
		lw       x9 , 20 (x4) 
		lw       x31 , 16 (x8) 
		lw       x20 , 12 (x27) 
		bne      x20 , x2 , Fail
		bne      x31 , x10 , Fail
		bne      x9 , x17 , Fail
		bne      x19 , x22 , Fail
		bne      x13 , x5 , Fail
		bne      x3 , x14 , Fail
		bne      x6 , x1 , Fail
		bne      x21 , x30 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
