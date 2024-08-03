.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x10 , x0 , 4 
		addi    x27 , x0 , 0 
		addi    x19 , x0 , 0 
		addi    x13 , x0 , 32 
InArr:
		addi    x12 , x0 , 8 
		addi    x7 , x0 , 24 
		addi    x11 , x0 , 40 
		addi    x20 , x0 , 24 
		sh      x12 , 40 (x13) 
		sh      x7 , 44 (x13) 
		sh      x11 , 48 (x13) 
		sh      x20 , 52 (x13) 
Loop:
		slli    x30 , x19 , 2 
		add     x23 , x30 , x13 
		lh      x25 , 40 (x23) 
		add     x27 , x27 , x25 
		addi    x19 , x19 , 1 
		beq     x19 , x10 , Result 
		jal     x0 , Loop 
Result:
		addi    x29 , x0 , 96 
		bne     x29 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
