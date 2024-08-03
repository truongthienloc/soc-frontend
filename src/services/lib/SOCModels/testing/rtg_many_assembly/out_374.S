.text

#The program checks the ALU instruction in I_type

Main:
		addi    x14 , x0 , 59 
		addi    x17 , x0 , 58 
		sltu    x22 , x14 , x17 
		bltu    x14 , x17 , Less_i 
		bgeu    x14 , x17 , Bigger_i 
Less_i:
		ori     x13 , x14 , 17 
		sub     x28 , x17 , x14 
		srai    x28 , x28 , 4 
		and     x28 , x28 , x0 
		addi    x24 , x0 , 0 
		beq     x28 , x24 , Pass 
Bigger_i:
		ori     x13 , x14 , 63 
		sub     x28 , x17 , x14 
		srai    x28 , x28 , 0 
		and     x28 , x28 , x0 
		addi    x24 , x0 , 0 
		beq     x28 , x24 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
