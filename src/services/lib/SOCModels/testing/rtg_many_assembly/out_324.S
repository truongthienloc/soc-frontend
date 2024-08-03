.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x13 , x0 , 4 
		add     x4 , x0 , x0 
		add     x3 , x0 , x0 
		addi    x11 , x0 , 44 
InArr:
		addi    x18 , x0 , 24 
		addi    x26 , x0 , 60 
		addi    x1 , x0 , 4 
		addi    x28 , x0 , 24 
		sb      x18 , 48 (x11) 
		sb      x26 , 52 (x11) 
		sb      x1 , 56 (x11) 
		sb      x28 , 60 (x11) 
Loop:
		slli    x14 , x3 , 2 
		add     x10 , x14 , x11 
		lb      x12 , 48 (x10) 
		add     x4 , x4 , x12 
		addi    x3 , x3 , 1 
		beq     x3 , x13 , Result 
		jal     x0 , Loop 
Result:
		addi    x29 , x0 , 112 
		bne     x29 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
