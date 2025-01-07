.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x12 , x0 , 4 
		addi    x9 , x0 , 0 
		addi    x26 , x0 , 0 
		addi    x27 , x0 , 52 
InArr:
		addi    x15 , x0 , 64 
		addi    x18 , x0 , 28 
		addi    x31 , x0 , 32 
		addi    x3 , x0 , 20 
		sh      x15 , 12 (x27) 
		sh      x18 , 16 (x27) 
		sh      x31 , 20 (x27) 
		sh      x3 , 24 (x27) 
Loop:
		slli    x29 , x26 , 2 
		add     x14 , x29 , x27 
		lh      x28 , 12 (x14) 
		add     x9 , x9 , x28 
		addi    x26 , x26 , 1 
		beq     x26 , x12 , Result 
		jal     x0 , Loop 
Result:
		addi    x13 , x0 , 144 
		bne     x13 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
