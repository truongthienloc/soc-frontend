.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x25 , x0 , 4 
		add     x11 , x0 , x0 
		add     x21 , x0 , x0 
		addi    x15 , x0 , 68 
		addi    x31 , x0 , 2 
InArr:
		addi    x6 , x0 , 72 
		addi    x22 , x0 , 12 
		addi    x23 , x0 , 0 
		addi    x3 , x0 , 40 
		sh      x6 , 68 (x15) 
		sh      x22 , 72 (x15) 
		sh      x23 , 76 (x15) 
		sh      x3 , 80 (x15) 
Loop:
		sll     x24 , x21 , x31 
		add     x12 , x24 , x15 
		lhu     x4 , 68 (x12) 
		add     x11 , x11 , x4 
		addi    x21 , x21 , 1 
		beq     x21 , x25 , Result 
		jal     x0 , Loop 
Result:
		addi    x17 , x0 , 124 
		bne     x17 , x11 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
