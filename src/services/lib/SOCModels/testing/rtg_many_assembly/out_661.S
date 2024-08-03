.text

#The program checks the ALU instruction in I_type

Main:
		addi    x23 , x0 , -2048 
		addi    x17 , x0 , 151 
		sltu    x6 , x23 , x17 
		bltu    x23 , x17 , Less_i 
		bgeu    x23 , x17 , Bigger_i 
Less_i:
		ori     x16 , x23 , 169 
		sub     x14 , x17 , x23 
		srai    x14 , x14 , 3 
		and     x14 , x14 , x0 
		addi    x20 , x0 , 0 
		beq     x14 , x20 , Pass 
Bigger_i:
		ori     x16 , x23 , 171 
		sub     x14 , x17 , x23 
		srai    x14 , x14 , 4 
		and     x14 , x14 , x0 
		addi    x20 , x0 , 0 
		beq     x14 , x20 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
