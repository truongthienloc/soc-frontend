.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x9 , 1
		auipc    x18 , 2
		auipc    x22 , 4
		auipc    x27 , 4
		lui      x24 , 4
		lui      x11 , 7
		lui      x7 , 8
		lui      x19 , 0
		sw       x8 , 28 (x9) 
		sw       x5 , 32 (x18) 
		sw       x1 , 36 (x22) 
		sw       x29 , 40 (x27) 
		sw       x14 , 44 (x24) 
		sw       x3 , 48 (x11) 
		sw       x16 , 52 (x7) 
		sw       x26 , 56 (x19) 
		lw       x20 , 56 (x19) 
		lw       x12 , 52 (x7) 
		lw       x30 , 48 (x11) 
		lw       x15 , 44 (x24) 
		lw       x13 , 40 (x27) 
		lw       x28 , 36 (x22) 
		lw       x4 , 32 (x18) 
		lw       x10 , 28 (x9) 
		bne      x10 , x8 , Fail
		bne      x4 , x5 , Fail
		bne      x28 , x1 , Fail
		bne      x13 , x29 , Fail
		bne      x15 , x14 , Fail
		bne      x30 , x3 , Fail
		bne      x12 , x16 , Fail
		bne      x20 , x26 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
