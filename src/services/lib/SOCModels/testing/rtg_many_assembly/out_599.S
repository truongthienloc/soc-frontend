.text

#The program checks the ALU instruction in I_type

Main:
		addi    x16 , x0 , -2048 
		addi    x20 , x0 , 69 
		sltu    x6 , x16 , x20 
		bltu    x16 , x20 , Less_i 
		bgeu    x16 , x20 , Bigger_i 
Less_i:
		ori     x28 , x16 , 97 
		sub     x8 , x20 , x16 
		srai    x8 , x8 , 4 
		and     x8 , x8 , x0 
		addi    x10 , x0 , 0 
		beq     x8 , x10 , Pass 
Bigger_i:
		ori     x28 , x16 , 95 
		sub     x8 , x20 , x16 
		srai    x8 , x8 , 1 
		and     x8 , x8 , x0 
		addi    x10 , x0 , 0 
		beq     x8 , x10 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
