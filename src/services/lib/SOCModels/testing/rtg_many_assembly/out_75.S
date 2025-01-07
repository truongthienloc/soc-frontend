.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x17 , x0 , 4 
		add     x10 , x0 , x0 
		add     x31 , x0 , x0 
		addi    x27 , x0 , 16 
		addi    x30 , x0 , 2 
InArr:
		addi    x1 , x0 , 48 
		addi    x22 , x0 , 8 
		addi    x20 , x0 , 44 
		addi    x23 , x0 , 72 
		sh      x1 , 48 (x27) 
		sh      x22 , 52 (x27) 
		sh      x20 , 56 (x27) 
		sh      x23 , 60 (x27) 
Loop:
		sll     x29 , x31 , x30 
		add     x15 , x29 , x27 
		lhu     x24 , 48 (x15) 
		add     x10 , x10 , x24 
		addi    x31 , x31 , 1 
		beq     x31 , x17 , Result 
		jal     x0 , Loop 
Result:
		addi    x4 , x0 , 172 
		bne     x4 , x10 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
