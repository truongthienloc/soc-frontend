.text

#The program checks the ALU instruction in R_type

Main:
		addi    x14 , x0 , 9 
		addi    x24 , x0 , -90 
		addi    x16 , x0 , 165 
		addi    x5 , x0 , 193 
		addi    x21 , x0 , 3 
		blt     x14 , x24 , Less_r 
		bge     x14 , x24 , Bigger_r 
Less_r:
		sub     x19 , x16 , x5 
		and     x9 , x16 , x5 
		add     x9 , x9 , x19 
		srl     x9 , x9 , x21 
		addi    x1 , x0 , 12 
		bne     x9 , x1 , Fail 
Bigger_r:
		or      x19 , x16 , x5 
		xor     x9 , x16 , x5 
		add     x9 , x9 , x19 
		sra     x9 , x9 , x21 
		addi    x1 , x0 , 41 
		bne     x9 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
