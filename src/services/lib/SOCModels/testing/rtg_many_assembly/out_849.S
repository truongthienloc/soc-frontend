.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x11 , 3
		auipc    x12 , 2
		auipc    x10 , 4
		auipc    x23 , 5
		lui      x25 , 5
		lui      x8 , 0
		lui      x4 , 5
		lui      x20 , 5
		sw       x18 , 80 (x11) 
		sw       x21 , 84 (x12) 
		sw       x29 , 88 (x10) 
		sw       x7 , 92 (x23) 
		sw       x31 , 96 (x25) 
		sw       x16 , 100 (x8) 
		sw       x26 , 104 (x4) 
		sw       x9 , 108 (x20) 
		lw       x1 , 108 (x20) 
		lw       x13 , 104 (x4) 
		lw       x28 , 100 (x8) 
		lw       x22 , 96 (x25) 
		lw       x24 , 92 (x23) 
		lw       x27 , 88 (x10) 
		lw       x17 , 84 (x12) 
		lw       x14 , 80 (x11) 
		bne      x14 , x18 , Fail
		bne      x17 , x21 , Fail
		bne      x27 , x29 , Fail
		bne      x24 , x7 , Fail
		bne      x22 , x31 , Fail
		bne      x28 , x16 , Fail
		bne      x13 , x26 , Fail
		bne      x1 , x9 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
