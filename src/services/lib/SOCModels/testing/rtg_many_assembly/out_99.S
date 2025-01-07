.text

#The program checks the ALU instruction in R_type

Main:
		addi    x3 , x0 , 47 
		addi    x4 , x0 , -52 
		addi    x8 , x0 , 81 
		addi    x31 , x0 , 67 
		addi    x16 , x0 , 4 
		blt     x3 , x4 , Less_r 
		bge     x3 , x4 , Bigger_r 
Less_r:
		sub     x6 , x8 , x31 
		and     x24 , x8 , x31 
		add     x24 , x24 , x6 
		srl     x24 , x24 , x16 
		addi    x10 , x0 , 4 
		bne     x24 , x10 , Fail 
Bigger_r:
		or      x6 , x8 , x31 
		xor     x24 , x8 , x31 
		add     x24 , x24 , x6 
		sra     x24 , x24 , x16 
		addi    x10 , x0 , 6 
		bne     x24 , x10 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
