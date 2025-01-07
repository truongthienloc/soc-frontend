.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x23 , x0 , 4 
		addi    x17 , x0 , 0 
		addi    x21 , x0 , 0 
		addi    x29 , x0 , 28 
InArr:
		addi    x27 , x0 , 12 
		addi    x28 , x0 , 16 
		addi    x4 , x0 , 48 
		addi    x6 , x0 , 60 
		sh      x27 , 8 (x29) 
		sh      x28 , 12 (x29) 
		sh      x4 , 16 (x29) 
		sh      x6 , 20 (x29) 
Loop:
		slli    x20 , x21 , 2 
		add     x18 , x20 , x29 
		lh      x24 , 8 (x18) 
		add     x17 , x17 , x24 
		addi    x21 , x21 , 1 
		beq     x21 , x23 , Result 
		jal     x0 , Loop 
Result:
		addi    x26 , x0 , 136 
		bne     x26 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
