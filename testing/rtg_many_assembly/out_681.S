.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x13 , 2
		auipc    x22 , 5
		auipc    x20 , 4
		auipc    x25 , 5
		lui      x6 , 6
		lui      x12 , 1
		lui      x9 , 9
		lui      x18 , 6
		sw       x21 , 44 (x13) 
		sw       x27 , 48 (x22) 
		sw       x14 , 52 (x20) 
		sw       x30 , 56 (x25) 
		sw       x2 , 60 (x6) 
		sw       x3 , 64 (x12) 
		sw       x31 , 68 (x9) 
		sw       x17 , 72 (x18) 
		lw       x4 , 72 (x18) 
		lw       x8 , 68 (x9) 
		lw       x10 , 64 (x12) 
		lw       x29 , 60 (x6) 
		lw       x26 , 56 (x25) 
		lw       x19 , 52 (x20) 
		lw       x24 , 48 (x22) 
		lw       x16 , 44 (x13) 
		bne      x16 , x21 , Fail
		bne      x24 , x27 , Fail
		bne      x19 , x14 , Fail
		bne      x26 , x30 , Fail
		bne      x29 , x2 , Fail
		bne      x10 , x3 , Fail
		bne      x8 , x31 , Fail
		bne      x4 , x17 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
