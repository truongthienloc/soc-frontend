.text

#The program checks the ALU instruction in R_type

Main:
		addi    x4 , x0 , 3 
		addi    x14 , x0 , -96 
		addi    x24 , x0 , 88 
		addi    x16 , x0 , 190 
		addi    x9 , x0 , 3 
		blt     x4 , x14 , Less_r 
		bge     x4 , x14 , Bigger_r 
Less_r:
		sub     x21 , x24 , x16 
		and     x2 , x24 , x16 
		slt     x2 , x2 , x21 
		srl     x2 , x2 , x9 
		addi    x1 , x0 , -10 
		bne     x2 , x1 , Fail 
Bigger_r:
		or      x21 , x24 , x16 
		xor     x2 , x24 , x16 
		sltu     x2 , x2 , x21 
		sra     x2 , x2 , x9 
		addi    x1 , x0 , 60 
		bne     x2 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
