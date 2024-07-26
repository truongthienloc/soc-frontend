.text

#The program checks the ALU instruction in R_type

Main:
		addi    x8 , x0 , 104 
		addi    x25 , x0 , 5 
		addi    x16 , x0 , 193 
		addi    x15 , x0 , 181 
		addi    x24 , x0 , 2 
		blt     x8 , x25 , Less_r 
		bge     x8 , x25 , Bigger_r 
Less_r:
		sub     x21 , x16 , x15 
		and     x14 , x16 , x15 
		slt     x14 , x14 , x21 
		srl     x14 , x14 , x24 
		addi    x6 , x0 , 35 
		bne     x14 , x6 , Fail 
Bigger_r:
		or      x21 , x16 , x15 
		xor     x14 , x16 , x15 
		sltu     x14 , x14 , x21 
		sra     x14 , x14 , x24 
		addi    x6 , x0 , 90 
		bne     x14 , x6 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
