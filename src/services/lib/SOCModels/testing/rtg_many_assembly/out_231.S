.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x28 , x0 , 4 
		addi    x4 , x0 , 0 
		addi    x13 , x0 , 0 
		addi    x11 , x0 , 16 
InArr:
		addi    x19 , x0 , 24 
		addi    x8 , x0 , 4 
		addi    x31 , x0 , 48 
		addi    x30 , x0 , 20 
		sh      x19 , 4 (x11) 
		sh      x8 , 8 (x11) 
		sh      x31 , 12 (x11) 
		sh      x30 , 16 (x11) 
Loop:
		slli    x20 , x13 , 2 
		add     x3 , x20 , x11 
		lh      x27 , 4 (x3) 
		add     x4 , x4 , x27 
		addi    x13 , x13 , 1 
		beq     x13 , x28 , Result 
		jal     x0 , Loop 
Result:
		addi    x15 , x0 , 96 
		bne     x15 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
